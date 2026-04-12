/**
 * Copyright (c) 2026 Santanu Majumdar. All rights reserved.
 * PROPRIETARY LICENSE: Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Santanu Majumdar <santanu.majumdar@hotmail.com>, 2026
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
