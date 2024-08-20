import {Delivery} from "@/types/type";

export const sortDelivery = (deliveries: Delivery[]): Delivery[] => {
    const result = deliveries.sort((a, b) => {
        const dateA = new Date(`${a.created_at}T${a.actual_order_delivery_time}`);
        const dateB = new Date(`${b.created_at}T${b.actual_order_delivery_time}`);
        return dateB.getTime() - dateA.getTime();
    });

    return result.reverse();
};

export function formatTime(minutes: number): string {
    const formattedMinutes = Math.round(minutes) || 0;
    const now = new Date();
    
    // Calculate the future time
    now.setMinutes(now.getMinutes() + formattedMinutes);
    
    // Extract hours and minutes
    const hours = now.getHours();
    const remainingMinutes = now.getMinutes();
    
    // Format the time with leading zeros for minutes if necessary
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedMinutesString = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

    return `${formattedHours}:${formattedMinutesString} ${ampm}`;
}

export function completeDelivery() {
    const now = new Date();

    // Extract hours and minutes
    let hours = now.getHours();
    const minutes = now.getMinutes();

    // Format hours for 12-hour clock
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 hours to 12 for midnight/noon
    
    // Format minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the time string
    const timeString = `${hours}:${formattedMinutes} ${ampm}`;
    
    // Return or display the time as needed
    return timeString;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day < 10 ? "0" + day : day} ${month} ${year}`;
}