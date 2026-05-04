import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        // --- НАШІ ПРАВИЛА З ЛАБИ ---
        rules: {
        // 1. Відступи в 4 пробіли 
            'indent': ['error', 4, { 'SwitchCase': 1 }],
      
            // 2. Максимум 400 рядків у файлі
            'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
      
            // 3. Максимум 75 рядків у функції
            'max-lines-per-function': ['error', { max: 75, skipBlankLines: true, skipComments: true }]
        }
    },
])