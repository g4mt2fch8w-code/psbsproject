#!/bin/bash
cd /Users/onkarbhople
rm -f lovable_updated.zip
zip -r lovable_updated.zip lovable -x "lovable/node_modules/*" -x "lovable/.git/*" -x "lovable/dist/*" -x "lovable/.output/*" -x "lovable/.vinxi/*"
echo "Project zipped successfully to /Users/onkarbhople/lovable_updated.zip"
