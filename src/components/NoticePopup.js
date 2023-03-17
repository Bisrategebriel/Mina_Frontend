import React, { useState } from "react";

function NoticePopup(props) {
	const [visible, setVisible] = useState(true);
	return (
		<div
			className={
				visible
					? "fixed bottom-0 z-50 w-screen p-4 bg-yellow-300 flex flex-col items-center"
					: "hidden"
			}
		>
			<p>
				በአሁኑ ወቅት በዌብሳይቱ ላይ የምታገኙዋቸውን ቪዲዮዎች መመልከት ገቢ የማያስገኝ መሆኑን እያሳወቅን። ምዝገባ ተጠናቆ
				በምናሳውቃችሁ ወቅት የሚለቀቁ አዳዲስ ቪዲዮዎች ከተመለከታችሁ በኋላ የምታገኙት ነጥብ ተሰብስቦ ተከፋይ የሚያደርጋችሁ
				ይሆናል። 
				<br />
                The points that you will collect by watching the videos that are
				currently posted will not be counted when we launch the website officially.
			</p>

			<button
				className="bg-white p-2 rounded-md w-fit"
				onClick={() => {
					setVisible(false);
				}}
			>
				I understand
			</button>
		</div>
	);
}

export default NoticePopup;
