class QueryBuilder{

    query = {}

    createQuery = ({text, selectedMin, selectedMax, all, institutions, specialists}) => {
        return({
            name: text, 
            reputation: this.formatRange(selectedMin, selectedMax),
            only: this.formatType({all, institutions, specialists})
        })
    }

    formatRange = (a,b) => {
        const range = [a,b];
        range.sort()
        return(String(range[0]) + ',' + String(range[1]))
    }

    varToString = varObj => Object.keys(varObj)[0]

    formatType = ({all, institutions, specialists}) =>{
        if(all == true){
            return('')
        }
        else{
            return(institutions == true? this.varToString({institutions}) : this.varToString({specialists}))
        }
    }
}



export default QueryBuilder
