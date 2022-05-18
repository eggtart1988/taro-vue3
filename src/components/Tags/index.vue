<template>
    <view :style="`width:${width/50}rem; height:${height/50}rem;`"
        :class="[styles['container'], isCurValue ? styles['current'] : '']" @click="handleClick">
        {{ label }}
    </view>

</template>

<script>
import styles from './index.module.scss'
import { computed, inject } from 'vue';
export default {
    name: 'Tags',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: [String, Number],
            default: ''
        },
        width: {
            type: [Number, String],
            default: 105
        },
        height: {
            type: [Number, String],
            default: 30
        }
    },
    setup(props) {
        let parent = inject('parent', null);

        const isCurValue = computed(() => {
            return parent.label.value == props.value;
        });

        const handleClick = () => {
            if (isCurValue.value) return;
            parent.updateValue(props.value, props.label);
        };

        return {
            isCurValue,
            handleClick,
            styles
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
