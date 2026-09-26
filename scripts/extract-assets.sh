#!/usr/bin/env bash
# Extracts web assets from the source PDFs in source-assets/ into public/.
# Requires poppler (pdftoppm) and ImageMagick (magick). Re-run safely at any time.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/source-assets"
OUT="$ROOT/public"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

RENDERS_PDF="$SRC/27-4-26-3D-compressed.pdf"
BROCHURE_PDF="$SRC/PRIMA SKY BROCHURE-6_260623_133951.pdf"

mkdir -p "$OUT/renders" "$OUT/plans" "$OUT/brand"

# ---- 3D renders (A3 landscape, 8 pages) --------------------------------------
names=(front-day front-elevation dusk corner-day garden-walk event-lawn aerial-corner aerial-rear)
pdftoppm -r 180 -png "$RENDERS_PDF" "$TMP/r"
i=1
for n in "${names[@]}"; do
  magick "$TMP/r-$i.png" -resize '2800x>' -strip -quality 84 -interlace Plane "$OUT/renders/$n.jpg"
  i=$((i + 1))
done

# ---- Brochure sheets (each PDF page is a two-page spread, 666x986pt per half) --
# Render at 200dpi: a spread is ~3700px wide.
pdftoppm -r 200 -png "$BROCHURE_PDF" "$TMP/b"
b() { printf '%s/b-%02d.png' "$TMP" "$1"; }

# Lobby interior (sheet 4, bottom-left photo). Crops are expressed as percentages
# of the spread so they survive DPI changes.
crop() { # src out WxH+X+Y in percent
  local src="$1" out="$2" geo="$3" q="${4:-86}"
  local W H; W=$(magick identify -format '%w' "$src"); H=$(magick identify -format '%h' "$src")
  IFS='x+' read -r pw ph px py <<<"$geo"
  magick "$src" -crop "$((W*pw/1000))x$((H*ph/1000))+$((W*px/1000))+$((H*py/1000))" +repage \
    -strip -quality "$q" -interlace Plane "$out"
}
crop "$(b 4)" "$OUT/renders/lobby.jpg"        "548x420+32+546"
crop "$(b 2)" "$OUT/renders/sketch.jpg"       "362x405+580+290"
crop "$(b 11)" "$OUT/brand/location-map.jpg"  "468x441+501+43"
crop "$(b 1)" "$OUT/brand/paper.jpg"          "900x150+50+180" 80

# Floor plans (for "View original plan"), trimmed of page furniture.
crop "$(b 8)"  "$OUT/plans/type-1.png" "470x800+30+120" 92
crop "$(b 8)"  "$OUT/plans/type-2.png" "470x800+530+120" 92
crop "$(b 9)"  "$OUT/plans/type-3.png" "470x800+28+120" 92
crop "$(b 9)"  "$OUT/plans/type-4.png" "470x800+530+120" 92
crop "$(b 6)"  "$OUT/plans/ground-floor.png"  "960x930+30+20" 90
crop "$(b 7)"  "$OUT/plans/typical-floor.png" "960x930+30+20" 90
for f in "$OUT"/plans/*.png; do
  magick "$f" -strip -quality 88 -interlace Plane "${f%.png}.jpg" && rm "$f"
done

# Logo
cp "$SRC/PRIMA SKY LOGO.png" "$OUT/brand/logo.png"

# Open Graph image: dusk render + gradient + logo lockup.
magick "$OUT/renders/dusk.jpg" -resize 1200x630^ -gravity center -extent 1200x630 \
  \( -size 1200x630 gradient:'rgba(11,27,46,0.1)-rgba(11,27,46,0.85)' \) -composite \
  \( "$OUT/brand/logo.png" -resize 520x -fill white -colorize 100 \) -gravity southwest -geometry +60+50 -composite \
  -quality 86 "$ROOT/app/opengraph-image.jpg"

echo "Assets written to $OUT"
