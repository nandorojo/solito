#!/usr/bin/env node

// inspired by https://github.com/vercel/next.js/blob/0355e5f63f87db489f36db8d814958cb4c2b828b/packages/create-next-app/helpers/examples.ts#L71

import chalk from 'chalk'
import got from 'got'
import path from 'path'
import { Stream } from 'stream'
import tar from 'tar'
import { promisify } from 'util'
const pipeline = promisify(Stream.pipeline)

type RepoInfo = {
  username: string
  name: string
  branch: string
  filePath: string
}

export function downloadAndExtractExample(
  root: string,
  name = 'blank'
): Promise<void | unknown> {
  if (name === '__internal-testing-retry') {
    throw new Error('This is an internal example for testing the CLI.')
  }

  return pipeline(
    got.stream('https://codeload.github.com/nandorojo/solito/tar.gz/master'),
    tar.extract({ cwd: root, strip: 3 }, [
      `solito-master/example-monorepos/${name}`,
    ])
  )
}

async function run() {
  chalk('Creating Solito app...')
  downloadAndExtractExample(path.resolve(process.cwd(), 'solito'))
}

run()
