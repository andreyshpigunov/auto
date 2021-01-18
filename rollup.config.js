import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

// Code for separated bundling for es5 and es6.
// In html using:
// <script src="/js/auto.js" type="module"></script>
// <script src="/js/auto.es5.js" nomodule></script>

// const plugins_es5 = [
// 	terser(),
// 	resolve(),
// 	babel({
// 		exclude: ["node_modules/**", "admin/**", "admin-modules/**"],
// 		babelHelpers: "bundled",
// 	}),
// ];
// 
// const plugins_es6 = [
// 	terser(),
// ];

const plugins = [
	terser(),
	resolve(),
	babel({
		exclude: ["node_modules/**", "admin/**", "admin-modules/**"],
		babelHelpers: "bundled",
	}),
];

export default [
	{
		input: ["src/js/auto.js"],
		output: [
			{
				file: "js/auto.js",
				format: "iife",
				name: "auto",
			},
		],
		plugins: plugins,
	},
];
