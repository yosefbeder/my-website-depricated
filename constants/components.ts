import { MDXProviderComponents } from '@mdx-js/react';
import {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	P1,
	Link,
	Italic,
	Strong,
	InlineCode,
	Blockquote,
	Ol,
	Ul,
} from '@yosefbeder/design-system/typography';
import { withId } from '@yosefbeder/design-system/utils';

const components: MDXProviderComponents = {
	h1: H1,
	h2: withId(H2),
	h3: withId(H3),
	h4: H4,
	h5: H5,
	h6: H6,
	p: P1,
	a: Link,
	em: Italic,
	strong: Strong,
	ol: Ol,
	ul: Ul,
	blockquote: Blockquote,
	inlineCode: InlineCode,
};

export default components;
