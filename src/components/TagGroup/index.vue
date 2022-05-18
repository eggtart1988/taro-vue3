<template>
    <view :class="styles['container']">
        <slot />
    </view>
</template>

<script>
import styles from './index.module.scss'
import { provide, computed, readonly, watch, reactive } from 'vue';
export default {
    name: 'TagGroup',
    emits: ['change', 'update:modelValue'],
    props: {
        modelValue: {
            type: [Number, String, Boolean, Object],
            default: ''
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            current: {}
        })

        const updateValue = (value, label) => {
            state.current = { value, label }
            emit('update:modelValue', value)
        }

        provide('parent', {
            label: readonly(computed(() => props.modelValue)),
            updateValue
        });

        watch(
            () => props.modelValue,
            (value) => emit('change', state.current)
        );

        return {
            styles
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
