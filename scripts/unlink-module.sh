
unlink() {
    echo "un linking module $1"
    yalc remove $1
    npm i
}

unlink $1