import { join } from 'path';

export default function prepHtmlbarsAstPluginsForUnwrap(registry: any): void {
  for (let wrapper of registry.load('htmlbars-ast-plugin')) {
    const { plugin, parallelBabel, baseDir } = wrapper;
    if (plugin) {
      // if the parallelBabel options were set on the wrapper, but not on the plugin, add it
      if (parallelBabel && !plugin._parallelBabel) {
        // NOTE: `_parallelBabel` (not `parallelBabel`) is expected by broccoli-babel-transpiler
        plugin._parallelBabel = {
          requireFile: join(__dirname, 'htmlbars-unwrapper.js'),
          buildUsing: 'unwrapPlugin',
          params: wrapper.parallelBabel,
        };
      }

      // if the baseDir is set on the wrapper, but not on the plugin, add it
      if (baseDir && !plugin.baseDir) {
        plugin.baseDir = baseDir;
      }
    }
  }
}
