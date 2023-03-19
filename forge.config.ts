import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    ignore: [
      new RegExp('/(jimp|qrcode-terminal|utf-8-validate|pino-pretty|bufferutil|@adiwajshing/keyed-db)/')
    ],
    icon: "./assets/icon",
    asar: {
      unpackDir: "node_modules/ffmpeg-static"
    },
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({
    setupIcon: "./assets/icon.ico"
  }), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({
    options: {
      icon: "./assets/icon.png",
    }
  })],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
