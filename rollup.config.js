import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

const plugins = [terser(), resolve(), babel({ exclude: "node_modules/**" })];

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
