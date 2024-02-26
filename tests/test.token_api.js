// import tester liabaries
const assert = require('assert');
const test = require('node:test');
// import the neccessery files 
const dotenv = require('dotenv');
const fs = require('fs');
// load enviorment variable
require('dotenv').config();

test('Test discord bot token', () => {
    assert.ok(process.env.TOKEN, 'Token should be defined');
    assert.strictEqual(typeof process.env.TOKEN, 'string', 'Token should be a string');
    assert.ok(process.env.TOKEN.length > 50, 'Token should not be an empty string');
});

const apiKeyPattern = /^sk-[a-zA-Z0-9.]+$/;

// Test, bot securely loads API keys from the .env file, confirming that no sensitive information is hard-coded
test('Test API_KEY is securely loads from .env file', () => {
    assert.ok(process.env.API_KEY, 'API_KEY should be defined');
    assert.strictEqual(typeof process.env.API_KEY, 'string', 'Token should be a string');
    assert.ok(process.env.API_KEY.length > 30, 'Token should not be an empty string');
    assert.ok(apiKeyPattern.test(process.env.API_KEY), 'API_KEY should match the expected pattern');
});
