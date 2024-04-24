set -e
set -x

poetry run black --check *.py && poetry run isort --check *.py && poetry run flake8 *.py || exit 1

echo "Everything works!"