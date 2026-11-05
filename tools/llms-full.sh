#!/bin/bash
# Builds llms-full.txt: every documentation page in one plain text file.
# Usage: tools/llms-full.sh <output-file>
set -e
cd "$(dirname "$0")/.."
out="${1:-llms-full.txt}"
order="agents.md documentation.md module.md module/basic.md module/hooks.md module/hooks/app.md module/hooks/customer.md module/hooks/admin.md module/hooks/loyalty-card.md module/hooks/menus.md module/forms.md module/account.md module/push.md module/offline-mode.md module/utils.md module/security.md module/core-inheritance.md module/testing.md module/hooks/system.md layout.md customization/template.md customization/icon.md stack/ionic-tools.md stack/utilities.md stack/frameworks.md cli/siberian.md api.md api/application.md api/user.md api/backoffice.md api/push.md api/preview.md api/job.md contribute.md"
{
  echo "# Siberian developer documentation (full text)"
  echo
  echo "Source: https://github.com/Xtraball/SiberianCMS-Doc, published at https://developers.siberiancms.com/"
  echo "When this text and the code on the trunk branch of https://github.com/Xtraball/Siberian disagree, the code is right."
  for page in $order; do
    [ -f "docs/$page" ] || { echo "missing docs/$page" >&2; exit 1; }
    echo
    echo "================================================================"
    echo "FILE: docs/$page"
    echo "================================================================"
    echo
    cat "docs/$page"
  done
} > "$out"
echo "wrote $out ($(wc -c < "$out") bytes)"
