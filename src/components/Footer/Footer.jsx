import style from './Footer.module.scss';

const now = new Date().getFullYear().toString();

export const Footer = () => {

	return (
		<footer className={style.footer}>
			<div className={style.footer__wrap + " container"}>

				<p className={style.date}>&copy; {now}</p>

			</div>
		</footer>
	);
}