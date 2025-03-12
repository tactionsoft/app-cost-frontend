import React from 'react';
import "./ThankYouPage.css";
import { useNavigate } from 'react-router-dom';

const ThankYouPage = ({onButtonClick}) => {
	console.log('onButtonClick',onButtonClick)
	const navigate=useNavigate();
	return (
		<div className="thank-you-page">
			<h1>Build the Next Big Thing</h1>
			<h4>Looking to bring your idea to life? Fill out a few details so we can determine next steps. Takes only a minute.</h4>

			{/* Your new section goes here */}
			<section data-qa="layout-placement-wrapper" className="layout-wrapper">
				<div className="content-wrapper">
					<div className="distribute-wrapper">
						<h1 className="text-wrapper">
							<span>Thank you for contacting us.</span>
						</h1>
						<p>
							<span>Please read our </span>
							<a href="#" rel="noopener noreferrer" target="_blank">
								FAQs
							</a>
							<span> for a more in-depth review of our processes and why we're able to move forward with only 20% of the people that reach out to us.</span>
							<br />
							<br />
							<span>Check out our blog for in-depth guides on building applications. </span>
						</p>
					</div>
					<div className="submit-button">
						<button onClick={()=>onButtonClick('pageone')} data-qa="thank-you-button" tabindex="0" className="thank-you-button">
							<span className="button-text-wrapper">
								<span className="text-wrapper">TactionSoft Blog</span>
							</span>
						</button>
						<div class="press">press <strong>Enter ↵</strong></div>
					</div>
				</div>
			</section>
			{/* Footer Component */}
			<Footer />
		</div>
	);
};
const Footer = () => {
	return (
		<div className="container-footer">
			<div className="footer-copy">
				<div className="social-footer">
					<ul className="social-list">
						<li className="social-item-linkedin">
							<a target="_blank" rel="noopener noreferrer" href="#">
								<i className="hc-linkedin"></i>
							</a>
						</li>
						<li className="social-item-facebook">
							<a target="_blank" rel="noopener noreferrer" href="#">
								<i className="hc-facebook"></i>
							</a>
						</li>
						<li className="social-item-x">
							<a target="_blank" rel="noopener noreferrer" href="#">
								<i className="hc-x"></i>
							</a>
						</li>
					</ul>
				</div>
				<div className="copy-text">
					<p>© 2025 TactionSoft LLC. All rights reserved. Tactionsoft LLC is an <a href="#">equal opportunity employer</a>.</p>
					<p>© 2025 TactionSoft. TactionSoft Foundation is a 501(c)(3) and all donations are tax-deductible. EIN 82-2671514</p>
				</div>
			</div>
		</div>
	);
};
export default ThankYouPage;
