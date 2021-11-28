export const ChallengeDetailsCard = ({ cardName, cardValue }) => {
    return (
        <div className="card">
            <div className="card-body d-flex align-items-center">
                <h4 className="text-capitalize">{cardName}</h4>
                <h4 className="ml-auto">{cardValue}</h4 >
            </div>
        </div>
    )
}
