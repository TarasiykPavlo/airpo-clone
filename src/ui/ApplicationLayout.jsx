const ApplicationLayout = ({ title, mainContent, footerContent }) => {
	return (
		<main className="application">
			<div>
				<h1 className="application__title">{title}</h1>

				{mainContent}
			</div>

			<footer className="application__footer">{footerContent}</footer>
		</main>
	);
};

export default ApplicationLayout;
