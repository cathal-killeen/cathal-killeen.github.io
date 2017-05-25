// components from main page
app.component('experience', {
    templateUrl: '../templates/main/experience.html',
    controller: Controller
});

Controller.$inject = ['$scope'];
function Controller($scope) {
    $scope.experience = experience;
}

// data for experience timeline
var experience = [
    {
        time: "February 2011",
        title: "Bell Labs",
        description: "During 5th year in secondary school, I completed a week of work eperience at Bell Labs in Dublin. Here, I worked with Arduino boards and various modules and components, and along with writing the embedded code, I developed several prototype IoT devices in the research lab. This experience solidified my interest in pursuing a career in software development.",
        image_url: "/img/experience/bell.png"
    },
    {
        time: "2014-2018",
        title: "University College Dublin",
        description: "After sitting my Leaving Certificate in June 2014, I began studying Computer Science at UCD the following August.",
        image_url: "/img/experience/ucd.gif"
    },
    {
        time: "2014-2016",
        title: "CoderDojo",
        description: "In October 2014 I began volunteering every Saturday at a CoderDojo club in Marian College, Dublin. At CoderDojo, we teach kids how to code using Scratch, and how to build websites using HTML, CSS and Javascript. The following year I worked at another CoderDojo club at Star of the Sea in Sandymount.",
        image_url: "/img/experience/coderdojo.png"
    },
    {
        time: "November 2014",
        title: "My First Hackathon",
        description: "In November 2014, I attended my first hackathon, Science Hack Day Dublin. It was a 24 hour event and I worked on 2 different projects/teams over the weekend. The first was a video call doorbell/ electronic door lock activated via a mobile app. The second was a skills based freelance website for students, which I ended up pitching to the judges. The doorbell project was the overall winner of the event.",
        image_url: "/img/experience/shd.jpg"
    },
    {
        time: "Summer 2015",
        title: "Go4IT Summer Camp",
        description: "After almost a year working at CoderDojo, I worked at a tech summer camp at Trinity College during summer 2015. At the summer camp, young people worked on various projects such as games using Scratch, stop motion videos, and their own personal websites.",
        image_url: "/img/experience/go4it.jpg"
    },
    {
        time: "January 2016 - August 2016",
        title: "Agrie Internship",
        description: "In 2016 I interned at the agri-tech startup Agrie (previously Plezica). There I worked with Node.js, Grafana and Angular.js to build client dashboards for visualizing agricultural data, along with embedded code for sensor nodes so that they could record various metrics. I also worked on a concept mobile application using the Ionic framework.",
        image_url: "/img/experience/agrie.png"
    },
    {
        time: "August 2016 - May 2017",
        title: "Study Abroad CU Boulder",
        description: "During the 2016/17 academic year, I did a study abroad exchange at the University of Colorado Boulder in the USA. Living in Boulder allowed me to travel to many different hackathons across the USA, and visit various tech centers around the country. I also experienced a different academic culture, and was able to take some Computer Science classes that were not available at UCD.",
        image_url: "/img/experience/boulder.jpg"
    },
    {
        time: "November 2016 - May 2017",
        title: "HackCU",
        description: "During the year I spent at Boulder, I became involved with HackCU, which is an intercollegiate Hackathon organized entirely by students at the university. Throughout the year, I helped organize events on campus including the flagship event HackCU, which saw over 400 attendees in 2017. I led the web development team that built the landing page and LIVE page for HackCU III.",
        image_url: "/img/experience/hackcu.jpg"
    }
];
