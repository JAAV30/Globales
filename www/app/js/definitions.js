Array.prototype.shuffle = function() {
    for ( var i = this.length-1; i > 0; i-- ) {
        var j = Math.floor( i * Math.random() );
        var tmp = this[ j ];
        this[ j ] = this[ i ];
        this[ i ] = tmp;
    }
    return this;
}
