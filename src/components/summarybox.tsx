interface SummaryBoxProps {
    summary: string;
}

export default function SummaryBox({summary} : SummaryBoxProps) {
    return (
        <div>
            <h1 className = "mx-6 my-4 text-3xl">Summary:</h1>
            <div className = "summary-card-small bg-gray-300 text-black mx-6 rounded">
                <div className = "summary-card-small-contents" dangerouslySetInnerHTML={{ __html: summary }}></div>
            </div>
        </div>
    );
} 