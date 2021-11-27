import React, { useEffect, useState } from 'react';

const useScrollTop = (containerRef: React.RefObject<HTMLElement>) => {
	const [scrollTop, setScrollTop] = useState(0);

	useEffect(() => {
		const container = containerRef.current!;

		container.addEventListener('scroll', () => {
			setScrollTop(container.scrollTop);
		});
	}, []);

	return scrollTop;
};

export default useScrollTop;
