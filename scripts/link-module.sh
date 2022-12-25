
link() {
    echo "Linking module $1"
    yalc link $1
    cd .yalc/$1/
    npm i
}

link $1