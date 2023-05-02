import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Schemes() {
    useEffect(() => {
        console.log(Object.keys(schemes));
    }, [])

    const schemes = {
        "Pradhan Mantri Fasal Bima Yojana": "Pradhan Mantri Fasal Bima Yojana is a government scheme launched in 2016 to provide insurance coverage and financial support to farmers in India in the event of crop loss due to natural calamities. The scheme provides insurance coverage of up to 50% of the sum insured for all food and oilseed crops and up to 100% of the sum insured for annual commercial and horticultural crops.",

        "Weather Based Crop Insurance Scheme (WBCIS)": "Weather Based Crop Insurance Scheme (WBCIS) is a crop insurance scheme launched by the Government of India in 2007. The scheme aims to provide financial support to farmers against crop losses caused by adverse weather conditions such as drought, flood, frost, and hailstorm. The insurance cover is based on weather parameters such as rainfall, temperature, and humidity, which are measured through a network of automatic weather stations. The scheme is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with various state governments and insurance companies. Farmers pay a nominal premium which is subsidized by the government. In case of crop loss, farmers receive compensation as per the terms and conditions of the scheme. WBCIS has been instrumental in providing relief to farmers and promoting sustainable agriculture practices.",

        "Coconut Palm Insurance Scheme (CPIS)": "Coconut Palm Insurance Scheme (CPIS) is a crop insurance scheme launched by the Government of India in 2016. The scheme aims to provide financial support to coconut farmers against losses caused by natural calamities such as cyclones, hurricanes, floods, landslides, and droughts. Under the scheme, coconut farmers pay a nominal premium which is subsidized by the government. In case of crop loss, farmers receive compensation as per the terms and conditions of the scheme. CPIS is implemented by the Coconut Development Board in collaboration with various state governments and insurance companies. The scheme has been instrumental in providing relief to coconut farmers and promoting sustainable coconut cultivation practices.",

        "Unified Package Insurance Scheme": "Unified Package Insurance Scheme (UPIS) is an insurance scheme launched by the Government of India in 1993. The scheme provides comprehensive coverage to farmers against losses caused by various risks such as natural calamities, pest attacks, and diseases. The insurance cover includes both crop insurance and personal accident insurance for farmers. UPIS is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with various state governments and insurance companies. Farmers pay, a nominal premium which is subsidized by the government. In case of crop loss or personal accident, farmers receive compensation as per the terms and conditions of the scheme. UPIS has been instrumental in providing financial protection to farmers and promoting sustainable agriculture practices.",

        "Agriculture Infrastructure Fund": "Agriculture Infrastructure Fund (AIF) is a financing scheme launched by the Government of India in 2020. The scheme aims to support the development of agriculture infrastructure such as cold storage, pack houses, processing units, and warehouses. The objective of AIF is to create modern infrastructure for farmers to store and sell their produce, reduce post-harvest losses, and increase their income. The scheme provides a loan of up to Rs. 2 crore to farmers, farmer groups, and agri-entrepreneurs for setting up agriculture infrastructure projects. The scheme is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with various financial institutions. AIF has been instrumental in providing financial support to farmers for setting up modern agriculture infrastructure and promoting agri-entrepreneurship in the country.",

        "Mission Amrit Sarovar": "With a view to conserve water for the future, the initiative Mission Amrit Sarovar was launched on 24th April 2022.The Mission is aimed at developing and rejuvenating 75 water bodies in each district of the country as a part of celebration of Azadi ka Amrit Mahotsav.All rural districts will develop having at least 75 Amrit Sarovars totalling about 50,000 Amrit Sarovars in the country.50,000 Amrit Sarovars should be completed by end of Amrit Varsh i.e. 15th August 2023.Amrit Sarovar will be constructed on at least 1 acre of land with a water holding capacity of about 10,000 cubic meters.If the district is unable to create as many new Amrit Sarovars, then district may take up rejuvenation of the existing structures for restoring their ecological and productive utility.The site of Amrit Sarovars will be approved by special Gram Sabha, which will also name Panchayat Partinidhi, who will on its behalf supervise  development of Amrit Sarovar.Resources for this activity available from Mahatma Gandhi NREGS, XV Finance Commission Grants (both tied and untied), PMKSY-WDC, PMKSY-HKKP-RRR or similar schemes from the State/ Central Govt. either individually or in combination may be accessed for this purpose.",

        "National Mission on Natural Farming": "National Mission on Natural Farming (NMNF) is a program launched by the Government of India in 2018. The mission aims to promote organic farming practices, reduce the use of chemical fertilizers and pesticides, and improve soil health. The objective of NMNF is to promote natural farming as a viable alternative to conventional farming practices and to support farmers in adopting natural farming techniques. The mission is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with state governments and other stakeholders. The mission provides support to farmers through training programs, demonstrations, and financial assistance for the adoption of natural farming practices. NMNF has been instrumental in promoting sustainable agriculture practices and reducing the adverse impact of conventional farming on the environment.",

        "Pradhan Mantri Krishi Sinchai Yojana": "Pradhan Mantri Krishi Sinchai Yojana (PMKSY) is a program launched by the Government of India in 2015. The scheme aims to improve the efficiency of water usage in agriculture and to provide water to every farm. The objective of PMKSY is to promote water conservation, enhance crop productivity, and create sustainable water sources. The program is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with state governments and other stakeholders. The scheme includes various components such as micro-irrigation, watershed development, and the renovation of traditional water bodies. PMKSY also provides financial assistance to farmers for the installation of water-saving technologies such as drip irrigation, sprinkler irrigation, and rainwater harvesting. The scheme has been instrumental in increasing the water use efficiency in agriculture and promoting sustainable water management practices.",

        "PM Kisan Maan Dhan Yojana": "PM Kisan Maan Dhan Yojana is a pension scheme launched by the Government of India in 2019. The scheme aims to provide social security to small and marginal farmers who are over the age of 60 years. The objective of PM Kisan Maan Dhan Yojana is to ensure that farmers have a regular income in their old age and are not dependent on others for their livelihood. The scheme is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with the Ministry of Rural Development and the Life Insurance Corporation of India. Under the scheme, farmers have to make a monthly contribution, and the government provides a matching contribution. The beneficiaries of the scheme receive a minimum pension of Rs. 3000 per month after the age of 60 years. The scheme has been instrumental in providing financial security to farmers and promoting social welfare in rural areas.",

        "Interest subvention for dairy sector": "Interest subvention for dairy sector is a financing scheme launched by the Government of India. The scheme aims to provide subsidized credit to dairy farmers for the purchase of milch animals and to promote dairy entrepreneurship in the country. The objective of the interest subvention scheme is to reduce the cost of credit and to make credit more accessible to dairy farmers. Under the scheme, dairy farmers can avail of a loan at a reduced rate of interest. The interest rate subsidy is provided by the government to the banks or financial institutions, and they pass on the benefit to the farmers. The scheme is implemented by the Ministry of Agriculture and Farmers' Welfare in collaboration with various financial institutions. The scheme has been instrumental in providing financial support to the dairy sector and promoting dairy entrepreneurship in the country."
    }

    const links = {
        "Pradhan Mantri Fasal Bima Yojana": "https://pmfby.gov.in/",
        "Weather Based Crop Insurance Scheme (WBCIS)": "https://pmfby.gov.in/",
        "Coconut Palm Insurance Scheme (CPIS)": "https://coconutboard.nic.in/coconut-palm-insurance-scheme/",
        "Unified Package Insurance Scheme": "https://www.gicofindia.com/en/group-insurance/unified-package-insurance-policy",
        "Agriculture Infrastructure Fund": "https://pmkisan.gov.in/AIFHome.aspx",
        "Mission Amrit Sarovar": "https://jalshakti-ddws.gov.in/mas",
        "National Mission on Natural Farming": "https://soilhealth.dac.gov.in/national-mission-natural-farming-nmnf",
        "Pradhan Mantri Krishi Sinchai Yojana": "https://pmksy.gov.in/",
        "PM Kisan Maan Dhan Yojana": "https://maandhan.in/",
        "Interest subvention for dairy sector": "https://dahd.nic.in/schemes/interest-subvention-scheme-dairy-sector"
    }

    return (
        <div className='container'>
            {
                Object.entries(schemes).map(([schemeName, schemeInfo]) => {
                    return <div className="card m-4" style={{ backgroundColor: "hsl(81, 100%, 95%)" }}>
                        <div className="card-body">
                            <h3>{schemeName}</h3>
                            <p>{schemeInfo}</p>
                            <Link className='btn btn-success' to={links[schemeName]} target='_blank'>Go to official website</Link>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Schemes
