const asyncHandler = require('express-async-handler')
const { search } = require('../routes/searchRoutes')
const Company = require('../models/searchModel')
const searches = require('../models/searchModel')

const setSearch = asyncHandler(async (req, res) => {
    try {
        const ads = await searches.aggregate([ 
                {$lookup : {
                    from: "company",
                    localField: "companyId",
                    foreignField: "companyId",
                    as: "common"
                    }},
                    { $match : 
                        {
                            $or: [
                                {headline:{ $regex:  req.body.key, $options: 'i'}},
                                {description:{ $regex:  req.body.key, $options: 'i'}},
                                {primaryKey:{ $regex:  req.body.key, $options: 'i'}},
                                {"common.companyName":{ $regex:  req.body.key, $options: 'i'}}
                            ]
                        }
                    },
                {$project : {
                        common: {
                          companyName: 1,
                          url: 1
                        }, 
                        primaryText: 1,
                        headline: 1,
                        description: 1,
                        cta: 1,
                        image: 1
                    }}

            ])
        
        return res.json(ads)
    } catch (err) {
        console.error(err)
    }
})

const addCompany = asyncHandler(async (req, res) => {

    const company = await Company.create({
        companyId: req.body.companyId,
        companyName: req.body.companyName,
        primaryText: req.body.primaryText,
        headline: req.body.headline,
        description: req.body.description,
        cta: req.body.cta,
        image: req.body.image,
        url: req.body.url
    })

    res.status(200).json(company)
})

module.exports = {
    setSearch,
    addCompany
}
