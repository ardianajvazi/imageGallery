const express = require('express');
var PORT = 5000;

express().use(express.static(__dirname + '/build')).listen(PORT, () => console.log('server up ' + PORT));
