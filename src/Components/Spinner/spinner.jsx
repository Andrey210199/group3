import { Watch } from 'react-loader-spinner';
import s from './index.module.css';

export const Spinner = () => {
  return (
    <div className={s.spinner}>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#EB2A2A"
        ariaLabel="watch-loading"
        visible={true}
      />
    </div>
  );
};
