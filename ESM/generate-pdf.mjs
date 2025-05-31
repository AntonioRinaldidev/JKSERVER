import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import CVDocument from '../dist/CvDocument.mjs';

export async function generate(data) {
	const element = React.createElement(CVDocument, { data });
	return await renderToBuffer(element);
}
