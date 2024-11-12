const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function generateEnv(envPostfix){
    // Load environment variables from .env.global
    const globalEnvPath = path.resolve(__dirname, '.env.global');
    const globalEnv = dotenv.parse(fs.readFileSync(globalEnvPath));
    
    // Prepare prefixed environment variables
    const expoEnv = {};
    const nextEnv = {};
    
    Object.keys(globalEnv).forEach(key => {
      expoEnv[`EXPO_${key}`] = globalEnv[key];
      nextEnv[`NEXT_PUBLIC_${key}`] = globalEnv[key];
    });
    
    // Convert to .env format
    const formatEnv = (env) => Object.entries(env).map(([key, value]) => `${key}=${value}`).join('\n');
    
    // Define paths for .env.local files
    const expoEnvPath = path.resolve(__dirname, `apps/expo/.env${envPostfix?`.${envPostfix}`:""}`);
    const nextEnvPath = path.resolve(__dirname, `apps/next/.env${envPostfix?`.${envPostfix}`:""}`);
    
    // Write .env.local files
    fs.writeFileSync(expoEnvPath, formatEnv(expoEnv));
    fs.writeFileSync(nextEnvPath, formatEnv(nextEnv));

    // Create environmental variables codebase used in packages/app with the name env.ts
    let envDotTsMain = 'import { Platform } from "react-native";\n\n// ############# Please do not change code below this line ##############\n';
    let envDotTsExport = "\nexport {\n";

    Object.keys(globalEnv).forEach((key)=> {
        envDotTsMain += `const ${key} = (Platform.OS !== 'web')?process.env.EXPO_${key}:process.env.NEXT_PUBLIC_${key};\n`
        envDotTsExport += `\t${key},\n`;
    });
    envDotTsExport += `};`;
    envDotTsMain += envDotTsExport;
    // Define path for env.ts in packages/app
    const envTsPath = path.resolve(__dirname, `packages/app/env.ts`);
    fs.writeFileSync(envTsPath, envDotTsMain);
    
    
    console.log('Environment variables have been set up for Expo and Next.js');
}

const envPostfix = process.env.APP_ENV || 'local';
generateEnv(envPostfix);