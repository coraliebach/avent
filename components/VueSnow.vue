<template>
  <!-- particle component-->
  <div>

    <Particles
      id="tsparticles"
      height={window.outerHeight}
      :particles-init="particlesInit"
      :particles-loaded="particlesLoaded"
      :options="{
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 400,
            },
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'image',
            stroke: {
              width: 10,
              color: '#fff',
            },
            polygon: {
              nb_sides: 7
            },
            image: {
              src: 'https://coraliebach.fr/stars.png',
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.7,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: false,
              speed: 20,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false,
            distance: 50,
            color: '#ffffff',
            opacity: 0.6,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'bottom',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 300,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false,
              mode:  'bubble'
            },
            onclick: {
              enable: true,
              mode: 'repulse'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 150,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 200,
              size: 2,
              duration: 2,
              opacity: 8,
              speed: 7
            },
            repulse: {
              distance: 200,
              duration: 0.2
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true,
      }"
    />
  </div>
</template>

<script>
export default {
  name: "Particlescomponent",
  data() {
    return {
      particlesInit: () => {},
      particlesLoaded: () => {},
    }
  },
};
</script>

<style scoped>
  #tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>
