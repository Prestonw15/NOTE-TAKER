const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3003;
const app = express();