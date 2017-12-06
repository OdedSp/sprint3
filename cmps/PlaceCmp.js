export default {
    template: ` 
    <div class="place-card">
        <ul>
            <li v-for="place in myPlaces">
        {{ place.name }}
        {{ place.desc }}
        {{ place.lat }}   |      {{ place.lng }}
            </li>
        </ul>
    </div>
    `,
    props :['myPlaces']
}

