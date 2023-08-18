<template>

  <canvas id="chart" height="100%"></canvas>

</template>


<script lang="ts">
declare const Chart: any;
</script>

<script setup lang="ts">
import { onMounted } from "vue";
onMounted(() => { loadChart()});

const loadChart = () => {
  var options = {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "pH",
              backgroundColor: "#405189",
              data: [65, 59, 81, 45, 56, 80, 50, 20],
            },
            {
              label: "Salinitas",
              backgroundColor: "#0ab39c",
              data: [12, 123, 34, 67, 34, 20, 90, 100],
            },
            {
              label: "Suhu",
              backgroundColor: "#f06548",
              data: [11, 20, 30, 40, 50, 90, 70, 32],
            },
            {
              label: "DO",
              backgroundColor: "#f7b84b",
              data: [10, 20, 30, 40, 50, 60, 70, 45],
            },
            {
              label: "Warna Air",
              backgroundColor: "#299cdb",
              data: [10, 67, 30, 40, 50, 12, 70, 78],
            }
          ],
        },
        options: {
          x: { ticks: { font: { family: "Poppins" } } },
          y: { ticks: { font: { family: "Poppins" } } },
          plugins: { legend: { labels: { font: { family: "Poppins" } } }},

        },
      }

 new Chart(document.getElementById("chart"), options);
};
</script>