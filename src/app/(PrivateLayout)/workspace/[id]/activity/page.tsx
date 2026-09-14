import ActivityWrapper from '@/components/modules/(workspace)/activity-feed/activity-wrapper';


const ActivityPage = async({params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    return (    
        <ActivityWrapper id={id}/>
    );
};

export default ActivityPage;