arg=$1
set -e

git init

git add -A

git commit -m $arg

git push -f https://github.com/majidbenmerah/todolist-express.js.git main
