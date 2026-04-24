import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import {readFileSync} from 'fs';
import {join} from 'path';

const {dependencies = {}, peerDependencies = {}, camelCaseName} = JSON.parse(readFileSync('package.json').toString());

export default defineConfig(({mode}) => {
	const isUmdBuild = mode === 'umd';
	const isNodeBuild = mode === 'node';

	return {
		plugins: isUmdBuild
			? []
			: [
					dts({
						tsconfigPath: isNodeBuild
							? './tsconfig.node.json'
							: './tsconfig.lib.json',
					}),
				],
		test: {
			globals: true,
		},
		build: {
			emptyOutDir: mode === 'lib',
			sourcemap: true,
			...(isNodeBuild
				? {
					ssr: join('src', 'lib', 'node.ts'),
					rollupOptions: {
						external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
						output: {
							entryFileNames: 'node.js',
							format: 'es',
						},
					},
			  }
				: {
					lib: {
						formats: isUmdBuild ? ['umd'] : ['cjs', 'es'],
						entry: join('src', 'lib', 'index.ts'),
						name: camelCaseName,
						fileName: (format) => {
							switch (format) {
								case 'cjs':
									return `index.cjs`;
								case 'umd':
									return `index.umd.js`;
								case 'es':
									return `index.js`;
							}
						},
					},
					rollupOptions: {
						// Externalize deps for ESM/CJS like tsup, but keep UMD more self-contained.
						external: isUmdBuild ? Object.keys(peerDependencies) : [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
						output: {
							// Provide global variables to use in the UMD build
							// for externalized deps
							globals: {
								// for example react: 'React'
							},
						},
					},
			  }),
		},
	};
});
