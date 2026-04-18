import { Tree, generateFiles, joinPathFragments, formatFiles, names } from '@nx/devkit';
import * as path from 'path';

interface NewRemoteSchema {
  name: string;
  port: number;
}

/**
 * Custom Nx generator: Scaffolds a new micro-frontend remote application.
 *
 * Usage:
 *   nx g @nx-micro-frontend-starter/tools:new-remote --name=my-feature --port=4203
 *
 * Creates:
 *   apps/remote-<name>/
 *   ├── src/Module.tsx
 *   ├── module-federation.config.js
 *   └── project.json
 */
export default async function newRemoteGenerator(tree: Tree, schema: NewRemoteSchema) {
  const { name, port } = schema;
  const { className, fileName, propertyName } = names(name);

  const projectRoot = `apps/remote-${fileName}`;

  // Generate files from template
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    name: fileName,
    className,
    propertyName,
    port,
    tmpl: '',
  });

  // Update shell module-federation.config.js to include new remote
  const shellConfigPath = 'apps/shell/module-federation.config.js';
  if (tree.exists(shellConfigPath)) {
    let content = tree.read(shellConfigPath, 'utf-8')!;
    const remoteEntry = `        'remote-${fileName}': 'remote_${propertyName}@http://localhost:${port}/remoteEntry.js',`;
    content = content.replace(
      /shared: \{/,
      `${remoteEntry}\n      },\n      shared: {`
    );
    tree.write(shellConfigPath, content);
  }

  await formatFiles(tree);

  return () => {
    console.log(`\n✅ Remote "${name}" created at ${projectRoot}`);
    console.log(`   Port: ${port}`);
    console.log(`   Run: nx serve remote-${fileName}`);
    console.log(`\n   Shell config updated. Restart the shell to load the new remote.\n`);
  };
}
