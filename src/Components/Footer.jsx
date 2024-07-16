import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';
const Footer = ()=>{
    return (
        <div className="w-full flex flex-col md:flex-row gap-8 justify-between p-2 mt-4 items-center bg-slate-50">
            <div className="img w-full md:w-1/3 flex justify-center md:justify-start">
                <img src="/LC_LOGO_black.png" alt="logo" className="w-36 h-12 md:w-60 md:h-20 hidden md:block" />
            </div>
            <div className="connect w-full md:w-1/3 text-center md:text-left">
                <span className='text-xl md:text-2xl font-medium'>Connect With Us</span>
                <ul className='my-2 flex justify-center md:justify-start flex-row gap-4'>
                    <li>
                        <a href="https://www.linkedin.com/company/birla-institute-of-technology-mesra-patna-campus/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size='2x' style={{ color: "#3a71cf" }} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/lcbitp/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size='2x' style={{ color: "#e66565" }} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className='w-full md:w-1/3 text-center md:text-left'>
                <span className='text-xl md:text-2xl font-medium'>Contact</span>
                <ul className='my-2 flex justify-center md:justify-start'>
                    <li>
                        <a href="mailto:clubliterary4@gmail.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faEnvelopesBulk} size='2x' style={{ color: "#74C0FC" }} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Footer;