import { GoLaw } from 'react-icons/go';
import style from './stiles.module.css'
import { BsFillAwardFill } from 'react-icons/bs';
import Faq from '../faq';

const AnimateBox = () => {
    return (<>
	
    	<div className={`z-1 ${style.area}`}>
		<Faq />
			<ul className={style.circles}>
				<li>Адвокат</li>
				<li><GoLaw /> </li>
				<li><BsFillAwardFill />                </li>
				<li>Суд</li>
				<li></li>
				<li>Закон</li>
				<li>Защита</li>
				<li></li>
				<li></li>
				<li>Право</li>
			</ul>
		</div>
      
    </>);
}

export default AnimateBox;