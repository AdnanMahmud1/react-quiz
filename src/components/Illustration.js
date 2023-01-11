
import classes from '../styles/Illustration.module.css'

export default function Illustration({imageSource}) {
  return (
    <div className={classes.illustration}>
      <img src={imageSource} alt="Signup" />
    </div>
  );
}
