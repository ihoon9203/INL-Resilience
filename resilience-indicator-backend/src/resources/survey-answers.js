const surveyAnswers = {
    'health': {
        answers: [
            {
                id: 1,
                score: '0/2',
                question: 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 2,
                score: '2/2',
                question: 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 3,
                score: '2/2',
                question: 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 4,
                score: '2/2',
                question: 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 5,
                score: '0/2',
                question: 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 6,
                score: '2/2',
                question: 'Would you feel comfortable handling anxiety that may be created in an emergency situation?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 7,
                score: '2/2',
                question: 'Are there underlying individual mental health impairments that could result in delays in evacuation?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 8,
                score: '2/2',
                question: 'Do you know how to prepare and pack your prescription medications that would last 7-10 days?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 9,
                score: '0/1',
                question: 'Do you have a list of medical organizations in your area, including routes to hospitals and emergency centers?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 10,
                score: '1/1',
                question: 'Do you have an emergency preparedness kit available and ready to be used in an emergency situation (items of inclusion would be food and water to sustain you for 3 days, personal essentials including a change in clothing, medications, electronics including and AM/FM radio, copies of critical documents such as passport, and an adequate supply of cash)?',
                answer:'Yes',
                sub_answers: []
            },
        ]
    },
    'cyber': {
        answers: [
            {
                id: 1,
                score: '0/7',
                question: 'Do you have secure internet connection?',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Have you changed the default name of your router?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '0/1',
                        question: 'Have you changed the routers original password?',
                        answer:'No',
                    },
                    {
                        id: 3,
                        score: '0/1',
                        question: 'Do you regularly change your router’s password every three months?',
                        answer:'No',
                    },
                    {
                        id: 4,
                        score: '0/1',
                        question: 'Do you regularly update your router’s firmware?',
                        answer:'No',
                    },
                    {
                        id: 5,
                        score: '0/1',
                        question: 'Have you installed a network firewall?',
                        answer:'No',
                    },
                    {
                        id: 6,
                        score: '0/1',
                        question: 'Do you have a guest network set up?',
                        answer:'No',
                    },
                    {
                        id: 7,
                        score: '0/1',
                        question: 'Do you use a third party ISP (internet service provider) rental modem for your home networking?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 2,
                score: '3/4',
                question: 'Are you protecting yourself when using public Wi-Fi?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Are you aware of open service set identifiers (SSID)?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '1/1',
                        question: 'Do you delete saved hotspots on your devices?',
                        answer:'Yes',
                    },
                    {
                        id: 3,
                        score: '1/1',
                        question: 'Do you make it a priority to verify the security of all public networks when connecting to them?',
                        answer:'Yes',
                    },
                    {
                        id: 4,
                        score: '1/1',
                        question: 'Do you use a virtual private network?',
                        answer:'Yes',
                    },
                ]
            },
            {
                id: 3,
                score: '1/1',
                question: 'Are you protecting yourself against spyware, malware, and phishing?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 4,
                score: '1/1',
                question: 'Have you installed antivirus or anti-malware protection software on your devices?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 5,
                score: '5/8',
                question: 'Are you using safe passwords to secure your personal and private accounts?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '1/1',
                        question: 'Are your passwords at least 16 characters long?',
                        answer:'Yes',
                    },
                    {
                        id: 2,
                        score: '1/1',
                        question: 'Are you using upper and lowercase letters, numbers and special characters?',
                        answer:'Yes',
                    },
                    {
                        id: 3,
                        score: '0/1',
                        question: 'Are your passwords unique for each account?',
                        answer:'No',
                    },
                    {
                        id: 4,
                        score: '1/1',
                        question: 'Are your passwords unique for each device?',
                        answer:'Yes',
                    },
                    {
                        id: 5,
                        score: '1/1',
                        question: 'Are you using dual-factor authorization when available?',
                        answer:'Yes',
                    },
                    {
                        id: 6,
                        score: '0/1',
                        question: 'Are you using unique passwords instead of variations of old ones?',
                        answer:'No',
                    },
                    {
                        id: 7,
                        score: '0/1',
                        question: 'Are you regularly changing your password every three months?',
                        answer:'No',
                    },
                    {
                        id: 8,
                        score: '1/1',
                        question: 'Are you using a password manager?',
                        answer:'Yes',
                    },
                ]
            },
            {
                id: 6,
                score: '0/1',
                question: 'Do you have automatic security updates turned on for your operating systems, PCs, applications and smart devices?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 7,
                score: '0/1',
                question: 'Is your data protected on external hard drives, USBs or the cloud?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 8,
                score: '1/1',
                question: 'Have you installed antivirus or anti-malware protection software on your devices?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 9,
                score: '0/1',
                question: 'Do you have automatic updates turned on for antivirus or anti-malware software?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 10,
                score: '1/1',
                question: 'Do you regularly backup your data?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 11,
                score: '0/3',
                question: 'Do you have a plan in place to recover your data after an emergency?',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Is your data backed up to the cloud?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '0/1',
                        question: 'Is your data backed up on flash drives or other external drives?',
                        answer:'No',
                    },
                    {
                        id: 3,
                        score: '0/1',
                        question: 'Do you test your plan every three months?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 12,
                score: '3/3',
                question: 'Are you protecting your smart home user devices?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '1/1',
                        question: 'Do you use a cloud-based firewall?',
                        answer:'Yes',
                    },
                    {
                        id: 2,
                        score: '1/1',
                        question: 'Do you use commercial home network firewall?',
                        answer:'Yes',
                    },
                    {
                        id: 3,
                        score: '1/1',
                        question: 'Do you keep your devices with sensative on a separate network?',
                        answer:'Yes',
                    },
                ]
            },
            {
                id: 13,
                score: '1/2',
                question: 'Is your workstation, laptop, or mobile device clear of any high-level protected information?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Is your information encrypted?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '1/1',
                        question: 'Is your information password protected?',
                        answer:'Yes',
                    },
                ]
            },
            {
                id: 14,
                score: '1/1',
                question: 'Do you review your banking and credit reports frequently?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 15,
                score: '3/5',
                question: 'For Parents: Are you teaching your children/teens internet safety?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '1/1',
                        question: 'Have you discussed the dangers of malware and how it can be downloaded?',
                        answer:'Yes',
                    },
                    {
                        id: 2,
                        score: '1/1',
                        question: 'Have you discussed online frauds and scams?',
                        answer:'Yes',
                    },
                    {
                        id: 3,
                        score: '0/1',
                        question: 'Have you discussed the dangers of online predators?',
                        answer:'No',
                    },
                    {
                        id: 4,
                        score: '1/1',
                        question: 'Are you using internet filters?',
                        answer:'Yes',
                    },
                    {
                        id: 5,
                        score: '0/1',
                        question: 'Have you discussed how to properly use social media?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 16,
                score: '1/1',
                question: 'For Elderly: Are you trained on how to identify internet and social media scams?',
                answer:'Yes',
                sub_answers: []
            },
        ]
    },
    'finance': {
        answers: [
            {
                id: 1,
                score: '1/1',
                question: 'Do you maintain an emergency fund of at least three month\'s expenses?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '1/1',
                        question: 'Do you maintain the emergency fund in cash on hand for at least seven days?',
                        answer:'Yes'
                    }
                ]
            },
            {
                id: 2,
                score: '0/1',
                question: 'Do you know the organizations that can help you immediately after a disaster for financial assistance?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 3,
                score: '1/1',
                question: 'In the event of an evacuation, do you have an easily accessible inventory of your financial and banking information?',
                answer:'Yes',
                sub_answers: []
            },
            {
                id: 4,
                score: '5/6',
                question: 'Do you know the steps to take after a disaster to protect your finances?',
                answer:'Yes',
                sub_answers: [
                    {
                        id: 1,
                        score: '1/1',
                        question: 'Do you know how to contact your insurance company?',
                        answer:'Yes'
                    },
                    {
                        id: 2,
                        score: '1/1',
                        question: 'Do you know how to contact your mortgage loan servicer if you own a home?',
                        answer:'Yes'
                    },
                    {
                        id: 3,
                        score: '1/1',
                        question: 'Do you know how to contact your utility company if you own or rent a home?',
                        answer:'Yes'
                    },
                    {
                        id: 4,
                        score: '1/1',
                        question: 'Do you know how to contact your auto loan lender if the ability to make payments is affected?',
                        answer:'Yes'
                    },
                    {
                        id: 5,
                        score: '1/1',
                        question: 'Do you know how to contact your credit card companies?',
                        answer:'Yes'
                    },
                    {
                        id: 6,
                        score: '0/1',
                        question: 'Do you know how to contact your student loan servicer to request disaster forbearance?',
                        answer:'No'
                    },
                ]
            },
            {
                id: 5,
                score: '0/1',
                question: 'Do you or your beneficiary have estate planning documents such as a will, living will, life insurance policy or health insurance plan?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 6,
                score: '0/1',
                question: 'Do you have a disaster and financial planning checklist for preparedness and recovery?',
                answer:'No',
                sub_answers: []
            },
        ]
    },
    'emergency': {
        answers: [
            {
                id: 1,
                score: '0/2',
                question: 'Do you have your (or your family) financial, household, and medical information in a secure but easily accessible location? ',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Do you have paper copies?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '0/1',
                        question: 'Do you have electronic copies?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 2,
                score: '0/1',
                question: 'Do you have property (homeowners or renters), health, life or hazard insurance?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 3,
                score: '0/1',
                question: 'Do you have a first-aid kit, three-day survival kit and car survival kit?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 4,
                score: '0/1',
                question: 'Do you check your emergency supply kit every six months to ensure the supplies are still up-to-date? ',
                answer:'No',
                sub_answers: []
            },
            {
                id: 5,
                score: '0/1',
                question: 'Do you have enough water and means to purify if clean water becomes unavailable?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 6,
                score: '0/1',
                question: 'Do you have a post-disaster safety and recovery plan?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 7,
                score: '0/5',
                question: 'Are you prepared in the events of a power outage?',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Do you have a backup generator with enough fuel to last several days?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '0/1',
                        question: 'Do you have alternate plans for refrigerating medicine, food, and other necessitates?',
                        answer:'No',
                    },
                    {
                        id: 3,
                        score: '0/1',
                        question: 'Do you have alternative power sources such as portable power banks and charges?',
                        answer:'No',
                    },
                    {
                        id: 4,
                        score: '0/1',
                        question: 'Do you have enough flashlights for every member of the household?',
                        answer:'No',
                    },
                    {
                        id: 5,
                        score: '0/1',
                        question: 'Do you have enough nonperishable food and water to last at least three days?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 8,
                score: '0/3',
                question: 'Do you have an individual plan in case of an emergency?',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Do you have an evacuation plan?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '0/1',
                        question: 'Do you have a shelter-in-place plan?',
                        answer:'No',
                    },
                    {
                        id: 3,
                        score: '0/1',
                        question: 'Do you have a communication plan?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 9,
                score: '0/2',
                question: 'Do you have the ability to help others around you in a disaster event?',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Do you know first aid?',
                        answer:'No',
                    },
                    {
                        id: 2,
                        score: '0/1',
                        question: 'Do you know CPR?',
                        answer:  'No',
                    },
                ]
            },
            {
                id: 10,
                score: '0/1',
                question: 'Do you know how to access government aid after an emergency or disaster?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 11,
                score: '0/1',
                question: 'Do you have an emergency plan in place for your pets?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 12,
                score: '0/1',
                question: 'Do you or your family practice your emergency plan?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 13,
                score: '0/1',
                question: 'Have you ever received any training on disaster preparation?',
                answer:'No',
                sub_answers: []
            },
            {
                id: 14,
                score: '0/1',
                question: 'Are you or someone in your family considered part of a vulnerable population with special health-care needs?',
                answer:'No',
                sub_answers: [
                    {
                        id: 1,
                        score: '0/1',
                        question: 'Do you have a plan in place for the vulnerable individual?',
                        answer:'No',
                    },
                ]
            },
            {
                id: 15,
                score: '0/1',
                question: 'Do you know where to get prenatal care or delivery help if your doctor’s office or hospital is closed? ',
                answer:'No',
                sub_answers: []
            },
            {
                id: 16,
                score: '0/1',
                question: 'Do you have a plan in order to help your baby sleep safely if you evacuate your home? ',
                answer:'No',
                sub_answers: []
            },
            {
                id: 17,
                score: '0/1',
                question: 'Do you have ready-to-feed formula available if clean water isn’t available?',
                answer:'No',
                sub_answers: []
            },
        ]
    },
}

module.exports = surveyAnswers;