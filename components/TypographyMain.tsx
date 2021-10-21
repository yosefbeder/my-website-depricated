import classes from '../styles/Layout.module.scss';
import { motion } from 'framer-motion';
import { routeTransitions } from '../pages/_app';

const TypographyMain: React.FC = ({ children }) => {
  return (
    <motion.main
      variants={routeTransitions}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={classes['typography-main']}
    >
      {children}
    </motion.main>
  );
};

export default TypographyMain;
