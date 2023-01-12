import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const languages = {
    en : {
        mainHeader : "WATCH VIDEOS AND EARN MONEY",
        cta : "This is the time to make money on your mobile phones and laptops Being anywhere in Ethiopia.",
        getStarted : "Get Started",
        dashboard : "Dashboard",
        threeSteps : "Three simple steps to get started.",
        register : "Register",
        watchVideo : "Watch Video",
        earn : "Earn",
        aboutUs : "About Us",
        contactUs : "Contact Us",
        aboutOne : "Mina play is the first Ethiopian website and application where you can make money by watching YouTube videos. Once you join mina play, you can earn money using links which you can find on the website and simply, copy the links from the website and paste on YouTube.",
        aboutTwo : "A variety of videos are included to satisfy your needs, such as educational content , entertainment, news, books, different programs and shows. Points and Rewards Mina play will give you points for watching videos and by completing some simple tasks.",
        aboutThree : "All the tasks have different points related to their importance and value. Such tasks are like giving feedback, liking videos, answering questions, engaging in open discussions and more. Mina play members collect points and coins which we call them Dembulo (ድምቡሎ). 100 points is equivalent to one Dembulo; One Dumbulo is equivalent to 15 birr.",
        aboutFour : "At the end of each month, members get paid or collect their Dembulos. The minimum withdrawal rate on mina play starts at 100 Birr.",
        howMinaWorks : "How does Mina play work?",
        step : "Step",
        stepOne : "Open Mina Play",
        stepOneDetail : "Log in to the website, check out the home page, and you will find an icon for registration. Then click the register button on the home page.",
        stepTwo : "Create an Account",
        stepTwoDetail : "Complete the personal information in the Sign-up form. Create a password and get confirmed. Then click the next button.",
        stepThree : "Pay Registration Fee",
        stepThreeDetail : "Select and transfer or pay the registration fee via the listed money transferring methods. Then click confirm the payment button.",
        stepFour : "Confirm Payment",
        stepFourDetail : "Fill in the requested questions and confirm your payment.",
        stepFive : "You're Done",
        stepFiveDetail : "Now you can Sign-in to mina play. Get instant access to work from your comfort and earn money.",
        q1 : "What is Mina play?",
        a1 : "Mina play is the first Ethiopian website and application where you can earn money by watching YouTube videos and accomplishing simple tasks.",
        q2 : "How does Mina play work?",
        a2 : "After completing the registration process, you get a membership, which allows you to access the money making links and videos. Once you register, you have a personal code to access your account.",
        q3 : "Is Mina play legit?",
        a3 : "Mina play is a legit website and application which you do as a side hassle.",
        q4 : "How to withdraw money?",
        a4 : "The collected coins or points from mina play can be converted into cash and can be withdrawn or transferred via tele birr.",
        faq : "Frequently Asked Questions",
        logout : "Logout", 
        login : "Login", 
        search : "Search",
        profile : "Profile",
        videos : "Videos",
        message : "Message",
        fullName : "Full Name",
        firstName : "First Name",
        lastName : "Last Name",
        email : "Email",
        phoneNumber : "Phone Number",
        password : "Password",
        oldPassword : "Old Password",
        newPassword : "New Password",
        confirmPassword : "Confirm Password",
        submit : "Submit",
        watchHistory : "Watch History",
        transactionHistory : "Transaction History",
        etb : "ETB",
        approved : "Approved",
        pending : "Pending",
        denied : "Denied",
        wallet : "Wallet",
        points : "Points",
        suggestedVideos : "Suggested Videos",
        withdraw : "Withdraw",
        pause : "Pause",
        play : "Play",

    },
    am : {
        mainHeader : "የኢንተርኔት አገልግሎት መጠቀምዎ ካልቀረ ተጨማሪ ገቢን ለምን አያገኙም? ",
        cta : "ቤትዎ ተቀምጠው በተንቀሳቃሽ ስልክዎ አልያም ላፕቶፕዎን በመጠቀም ገንዘብ የሚሰሩበት ጊዜ ደረሰ!",
        getStarted : "ይጀምሩ",
        dashboard : "መቆጣጠሪያ",
        threeSteps : "ለመጀመር 3 ቀላል ደረጃዎች",
        register : "ምዝገባ",
        watchVideo : "ተመልከት",
        earn : "አግኝ",
        aboutUs : "ስለ እኛ",
        contactUs : "ያግኙን",
        aboutOne : "ሚና ፕሌይ በኢትዮጵያ የመጀመሪያው የዪቲዮብ ቪዲዮዎችን በመመልከትና የሚሰጠቱ ቀለል ያሉ ተግባራትን በመፈፀም ገንዘብ የሚሰሩበት (ክፍያ የሚያገኙበት) ዌብሳይትና የሞባይል መተግበሪያ (አፕልኬሽን) ነው።",
        aboutTwo : "ሚና ፕሌይን ከተቀላቀሉ በኋላ በዌብሳይቱ ላይ የሚያገኟቸውን የዩቲዩብ ቪዲዮዎችን እስከ መጨረሻው በመመልከት፣ አስተያየት በመስጠት፣ ቪዲዮዎቾን በመውደድ (like በማድረግ) ጥያቄዎችን በመመለስ እና ሌሎች ቀለል ያሉ ተግባራትን በማከናወን ለአባላቱ ክፍያ የሚፈፅም ዌብሳይት ነው። ",
        aboutThree : "ሚና ፕሌይ ወጣቶች የኢንተርኔት መረብ አገልግሎትን እየተጠቀሙ እየተዝናኑ መረጃ እያገኙ እውቀት እየተካፈሉ ገንዘብ እንዲሰሩ የሚያስችል ዌብሳይትና የሞባይል መተግበሪያ ነው።",
        aboutFour : "በሚና ፕሌይ አዝናኝ፣ አስተማሪ፣ ቁምነገር አዘል ውይይቶች፣ አሳታፊ ፕሮግራሞች፣ ትረካዎች፣ መፅሐፍት እና ሌሎችም ቪዲዮዎች ማራኪ በሆነ አቀራረብና ደረጃውን በጠበቀ የቀረፃ ብቃት ተዘጋጅተው የሚቀርቡበት ዌብሳይት ነው።",
        howMinaWorks : "የሚና ፕሌይ ዌብሳይትን ለመጠቀም የመመዝገቢያ ሒደት",
        step : "ደረጃ",
        stepOne : "ሚና ፕሌይን ይክፈቱ",
        stepOneDetail : "www.minaplay.com በማለት ወደ ዌብሳይቱ ይግቡ; የመጀመሪያውን የመተዋወቂያ ገፅ ያገኛሉ።  Register (መመዝገቢያ) የሚል ምልክት ተቀምጧል። ምልክቱን ይጫኑ።",
        stepTwo : "አካውንት ይፍጠሩ",
        stepTwoDetail : "በገፁ ላይ በሚያገኙት የመመዝገቢያ ፎርም ላይ የሚጠየቁትን የግል መረጃዎች ይሙሉ። የይለፍ ቃል ያስገቡና ማረጋገጫ ይቀበሉ በማስከተልም ቀጣይ (Next) የሚለውን ቁልፍ ይጫኑ።",
        stepThree : "መመዝገቢያ",
        stepThreeDetail : "የተዘረዘሩትን የገንዘብ ማስተላለፊያ መንገዶች በመጠቀም የመመዝገቢያ ክፍያዎን ይፈፅሙ። በማስከተለም የማረጋገጫ ቁልፉን ይጫኑ።",
        stepFour : "መክፈልዎን ያረጋግጡ",
        stepFourDetail : "ክፍያ መፈፀምዎን የሚያረጋግጠውን መረጃ ይሙሉ።",
        stepFive : "ጨርሰዋል",
        stepFiveDetail : "አሁን የሚና ፕሌይ አባል ሆነዋል። ከዚህ በኋላ የከፈቱትን የግል አካውንትዎን እና የይለፍ ቃልዎን በመጠቀም በሚና ፕሌይ ላይ የሚያገኟቸውን ቪዲዮዎች በመመልከትና የተቀመጡ ትእዛዞችን በመከወን ባሉበት ሆነው ገንዘብ ይስሩ፣ የሞባይል ጥቅል አገልግሎቶችን ያግኙ።",
        q1 : "ሚና ፕሌይ ምንድነው?",
        a1 : "ሚና ፕሌይ የዮቲዮብ ቪዲዮዎችን በመመልከት ክፍያ የሚያገኙበት ሜብሳይት ነው።",
        q2 : "ሚና ፕሌይ እንዴት ይሰራል?",
        a2 : "በሚና ፕሌይ ቪዲዮዎችን በመመልከት እና የተለያዩ ጥቅሞች (ተጨማሪ ገቢ) ለማግኘት የተመዘገቡ አባላት ወደ ዌብሳይቱ ገብተው ቪዲዮ ሲመለከቱ እና የተሰጧቸውን ትእዛዛት ሲፈፅሙ የሚያገኙትን ነጥብ በመቁጠር ወደ ክፍያ ቀይሮ አባላቱን ተጠቃሚ ያደርጋል። ",
        q3 : "ሚና ፕሌይ ህጋዊ ነው?",
        a3 : "ይህ ዌብሳይትና የሞባይል መተግበሪያ ህጋዊ ሲሆን እንደአባላቱ አፈፃፀም እየተለካ ከሞባይል ጥቅሎች አንስቶ የገንዘብ ተከፋይ እስከመሆን የሚያደርሱ ጥቅማጥቅሞች የያዘ ዌብሳይት ነው።",
        q4 : "ክፍያን እንዴት መቀበል ይቻላል?",
        a4 : "አባላቱ ዌብሳይቱ ላይ እንደሰሩት መጠን በሞባይል ጥቅል አገልግሎቶች የሚያስገኝ ተግባርን ሲያከናውኑ በቀጥታ በስልካቸው የአየር ሰዓትና የኢንተርኔት ጥቅል አገልግሎቶች ይላኩላቸዋል። አባላቱ የስራቸው ክንውን የገንዘብ ተከፋይ ሲያደርጋቸው በቀጥታ በባንክ አካውንታቸው በኩል በየወሩ መጨረሻ ክፍያ ይፈፀምላቸዋል።",
        faq : "በተደጋጋሚ የተጠየቁ",
        logout : "ዝጋ", 
        login : "ግባ",
        search : "ፈልግ",
        profile : "የኔ መረጃ",
        videos : "ቪድዮዎች",
        message : "መልዕክት",
        fullName : "ሙሉ ስም",
        firstName : "የመጀመሪያ ስም",
        lastName : "የወላጅ ስም",
        email : "ኢሜል",
        phoneNumber : "ስልክ ቁጥር",
        password : "የይለፍ ቃል",
        oldPassword : "የድሮ ይለፍ ቃል",
        newPassword : "አዲስ ይለፍ ቃል",
        confirmPassword : "አዲስ ይለፍ ቃል አረጋግጥ",
        submit : "አረጋግጥ",
        watchHistory : "የቀድሞ ምልከታዎች",
        transactionHistory : "የቀድሞ ገንዘብ ዝርዝሮች",
        etb : "ብር",
        approved : "የተረጋገጡ",
        pending : "ያልተወሰኑ",
        denied : "የተከለከሉ",
        wallet : "ዋሌት",
        points : "ነጥብ",
        suggestedVideos : "ተጨማሪ ቪድዮዎች",
        withdraw : "አውጣ",
        pause : "አቁም",
        play : "አጫውት",
    }
}


export const LanguageContext = createContext();
const LanguageContextProvider = ({ children }) => {
    const [activeLanguage, setActiveLanguage] = useState(localStorage.getItem("lang") === "am" ? languages.am : languages.en)

    const setCurrentLanguage = (lang)=>{
        lang === "am" ? setActiveLanguage(languages.am) : setActiveLanguage(languages.en)
    }
    return (
        <LanguageContext.Provider value={[activeLanguage,setCurrentLanguage]}>
            {children}
        </LanguageContext.Provider>
    )
}
root.render(
	<React.StrictMode>
        <LanguageContextProvider>
            <Router>
                {/* <Routes> */}
                {/* <Route path="/" element={ <App />}></Route> */}
                <App />

                {/* </Routes> */}
            </Router>
        </LanguageContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
