const categoryQuestions = {
    'health': {
        questions: [
            {
                id: 1,
                text: 'Do you believe that you maintain a healthy lifestyle that includes a balance of recommended physical activity and nutritious food choices?',
                sub_questions: []
            },
            {
                id: 2,
                text: 'Do you feel that you have a comfortable social network that includes neighbors, friends and family that would come to your aid in an emergency?',
                sub_questions: []
            },
            {
                id: 3,
                text: 'Do you have access to media sources (television, radio and/or internet) that would alert you of an emergency event that is occurring in your area?',
                sub_questions: []
            },
            {
                id: 4,
                text: 'Can you safely and efficiently evacuate from your living location by yourself with no assistance?',
                sub_questions: []
            },
            {
                id: 5,
                text: 'Are there any individual physical health impairments that prevent you from acting in an emergency situation?',
                sub_questions: []
            },
            {
                id: 6,
                text: 'Would you feel comfortable handling anxiety that may be created in an emergency situation?',
                sub_questions: []
            },
            {
                id: 7,
                text: 'Are there underlying individual mental health impairments that could result in delays in evacuation?',
                sub_questions: []
            },
            {
                id: 8,
                text: 'Do you know how to prepare and pack your prescription medications that would last 7-10 days?',
                sub_questions: []
            },
            {
                id: 9,
                text: 'Do you have a list of medical organizations in your area, including routes to hospitals and emergency centers?',
                sub_questions: []
            },
            {
                id: 10,
                text: 'Do you have an emergency preparedness kit available and ready to be used in an emergency situation (items of inclusion would be food and water to sustain you for 3 days, personal essentials including a change in clothing, medications, electronics including and AM/FM radio, copies of critical documents such as passport, and an adequate supply of cash )?',
                sub_questions: []
            },
        ]
    },
    'cyber': {
        questions: [
            {
                id: 1,
                text: 'Do you have secure internet connection?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Have you changed the default name of your router?'
                    },
                    {
                        id: 2,
                        text: 'Have you changed the routers original password?'
                    },
                    {
                        id: 3,
                        text: 'Do you regularly change your router’s password every three months?'
                    },
                    {
                        id: 4,
                        text: 'Do you regularly update your router’s firmware?'
                    },
                    {
                        id: 5,
                        text: 'Have you installed a network firewall?'
                    },
                    {
                        id: 6,
                        text: 'Do you have a guest network set up?'
                    },
                    {
                        id: 7,
                        text: 'Do you use a third party ISP (internet service provider) rental modem for your home networking?'
                    },
                ]
            },
            {
                id: 2,
                text: 'Are you protecting yourself when using public Wi-Fi?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Are you aware of open service set identifiers (SSID)?'
                    },
                    {
                        id: 2,
                        text: 'Do you delete saved hotspots on your devices?'
                    },
                    {
                        id: 3,
                        text: 'Do you make it a priority to verify the security of all public networks when connecting to them?'
                    },
                    {
                        id: 4,
                        text: 'Do you use a virtual private network?'
                    },
                ]
            },
            {
                id: 3,
                text: 'Are you protecting yourself against spyware, malware, and phishing?',
                sub_questions: []
            },
            {
                id: 4,
                text: 'Have you installed antivirus or anti-malware protection software on your devices?',
                sub_questions: []
            },
            {
                id: 5,
                text: 'Are you using safe passwords to secure your personal and private accounts?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Are your passwords at least 16 characters long?'
                    },
                    {
                        id: 2,
                        text: 'Are you using upper and lowercase letters, numbers and special characters?'
                    },
                    {
                        id: 3,
                        text: 'Are your passwords unique for each account?'
                    },
                    {
                        id: 4,
                        text: 'Are your passwords unique for each device?'
                    },
                    {
                        id: 5,
                        text: 'Are you using dual-factor authorization when available?'
                    },
                    {
                        id: 6,
                        text: 'Are you using unique passwords instead of variations of old ones?'
                    },
                    {
                        id: 7,
                        text: 'Are you regularly changing your password every three months?'
                    },
                    {
                        id: 8,
                        text: 'Are you using a password manager?'
                    },
                ]
            },
            {
                id: 6,
                text: 'Do you have automatic security updates turned on for your operating systems, PCs, applications and smart devices?',
                sub_questions: []
            },
            {
                id: 7,
                text: 'Is your data protected on external hard drives, USBs or the cloud?',
                sub_questions: []
            },
            {
                id: 8,
                text: 'Have you installed antivirus or anti-malware protection software on your devices?',
                sub_questions: []
            },
            {
                id: 9,
                text: 'Do you have automatic updates turned on for antivirus or anti-malware software?',
                sub_questions: []
            },
            {
                id: 10,
                text: 'Do you regularly backup your data?',
                sub_questions: []
            },
            {
                id: 11,
                text: 'Do you have a plan in place to recover your data after an emergency?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Is your data backed up to the cloud?'
                    },
                    {
                        id: 2,
                        text: 'Is your data backed up on flash drives or other external drives?'
                    },
                    {
                        id: 3,
                        text: 'Do you test your plan every three months?'
                    },
                ]
            },
            {
                id: 12,
                text: 'Are you protecting your smart home user devices?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you use a cloud-based firewall?'
                    },
                    {
                        id: 2,
                        text: 'Do you use commercial home network firewall?'
                    },
                    {
                        id: 3,
                        text: 'Do you keep your devices with sensative on a separate network?'
                    },
                ]
            },
            {
                id: 13,
                text: 'Is your workstation, laptop, or mobile device clear of any high-level protected information?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Is your information encrypted?'
                    },
                    {
                        id: 2,
                        text: 'Is your information password protected?'
                    },
                ]
            },
            {
                id: 14,
                text: 'Do you review your banking and credit reports frequently?',
                sub_questions: []
            },
            {
                id: 15,
                text: 'For Parents: Are you teaching your children/teens internet safety?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Have you discussed the dangers of malware and how it can be downloaded?'
                    },
                    {
                        id: 2,
                        text: 'Have you discussed online frauds and scams?'
                    },
                    {
                        id: 3,
                        text: 'Have you discussed the dangers of online predators?'
                    },
                    {
                        id: 4,
                        text: 'Are you using internet filters?'
                    },
                    {
                        id: 5,
                        text: 'Have you discussed how to properly use social media?'
                    },
                ]
            },
            {
                id: 16,
                text: 'For Elderly: Are you trained on how to identify internet and social media scams?',
                sub_questions: []
            },
        ]
    },
    'finance': {
        questions: [
            {
                id: 1,
                text: 'Do you maintain an emergency fund of at least three month\'s expenses?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you maintain the emergency fund in cash on hand for at least seven days?'
                    }
                ]
            },
            {
                id: 2,
                text: 'Do you know the organizations that can help you immediately after a disaster for financial assistance?',
                sub_questions: []
            },
            {
                id: 3,
                text: 'In the event of an evacuation, do you have an easily accessible inventory of your financial and banking information?',
                sub_questions: []
            },
            {
                id: 4,
                text: 'Do you know the steps to take after a disaster to protect your finances?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you know how to contact your insurance company?'
                    },
                    {
                        id: 2,
                        text: 'Do you know how to contact your mortgage loan servicer if you own a home?'
                    },
                    {
                        id: 3,
                        text: 'Do you know how to contact your utility company if you own or rent a home?'
                    },
                    {
                        id: 4,
                        text: 'Do you know how to contact your auto loan lender if the ability to make payments is affected?'
                    },
                    {
                        id: 5,
                        text: 'Do you know how to contact your credit card companies?'
                    },
                    {
                        id: 6,
                        text: 'Do you know how to contact your student loan servicer to request disaster forbearance?'
                    },
                ]
            },
            {
                id: 5,
                text: 'Do you or your beneficiary have estate planning documents such as a will, living will, life insurance policy or health insurance plan?',
                sub_questions: []
            },
            {
                id: 6,
                text: 'Do you have a disaster and financial planning checklist for preparedness and recovery?',
                sub_questions: []
            },
        ]
    },
    'emergency': {
        questions: [
            {
                id: 1,
                text: 'Do you have your (or your family) financial, household, and medical information in a secure but easily accessible location? ',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you have paper copies?'
                    },
                    {
                        id: 2,
                        text: 'Do you have electronic copies?'
                    },
                ]
            },
            {
                id: 2,
                text: 'Do you have property (homeowners or renters), health, life or hazard insurance?',
                sub_questions: []
            },
            {
                id: 3,
                text: 'Do you have a first-aid kit, three-day survival kit and car survival kit?',
                sub_questions: []
            },
            {
                id: 4,
                text: 'Do you check your emergency supply kit every six months to ensure the supplies are still up-to-date? ',
                sub_questions: []
            },
            {
                id: 5,
                text: 'Do you have enough water and means to purify if clean water becomes unavailable?',
                sub_questions: []
            },
            {
                id: 6,
                text: 'Do you have a post-disaster safety and recovery plan?',
                sub_questions: []
            },
            {
                id: 7,
                text: 'Are you prepared in the events of a power outage?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you have a backup generator with enough fuel to last several days?'
                    },
                    {
                        id: 2,
                        text: 'Do you have alternate plans for refrigerating medicine, food, and other necessitates?'
                    },
                    {
                        id: 3,
                        text: 'Do you have alternative power sources such as portable power banks and charges?'
                    },
                    {
                        id: 4,
                        text: 'Do you have enough flashlights for every member of the household?'
                    },
                    {
                        id: 5,
                        text: 'Do you have enough nonperishable food and water to last at least three days?'
                    },
                ]
            },
            {
                id: 8,
                text: 'Do you have an individual plan in case of an emergency?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you have an evacuation plan?'
                    },
                    {
                        id: 2,
                        text: 'Do you have a shelter-in-place plan?'
                    },
                    {
                        id: 3,
                        text: 'Do you have a communication plan?'
                    },
                ]
            },
            {
                id: 9,
                text: 'Do you have the ability to help others around you in a disaster event?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you know first aid?'
                    },
                    {
                        id: 2,
                        text: 'Do you know CPR?'
                    },
                ]
            },
            {
                id: 10,
                text: 'Do you know how to access government aid after an emergency or disaster?',
                sub_questions: []
            },
            {
                id: 11,
                text: 'Do you have an emergency plan in place for your pets?',
                sub_questions: []
            },
            {
                id: 12,
                text: 'Do you or your family practice your emergency plan?',
                sub_questions: []
            },
            {
                id: 13,
                text: 'Have you ever received any training on disaster preparation?',
                sub_questions: []
            },
            {
                id: 14,
                text: 'Are you or someone in your family considered part of a vulnerable population with special health-care needs?',
                sub_questions: [
                    {
                        id: 1,
                        text: 'Do you have a plan in place for the vulnerable individual?'
                    },
                ]
            },
            {
                id: 15,
                text: 'Do you know where to get prenatal care or delivery help if your doctor’s office or hospital is closed? ',
                sub_questions: []
            },
            {
                id: 16,
                text: 'Do you have a plan in order to help your baby sleep safely if you evacuate your home? ',
                sub_questions: []
            },
            {
                id: 17,
                text: 'Do you have ready-to-feed formula available if clean water isn’t available?',
                sub_questions: []
            },
        ]
    },
}

export default categoryQuestions;