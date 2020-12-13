import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default [
	{
		input: ["src/js/base.js"],
		output: [
			{
				file: "js/base.js",
				format: "iife",
				name: "Base",
			},
		],
		plugins: [terser(), resolve(), babel({ exclude: "node_modules/**" })],
	},
];
