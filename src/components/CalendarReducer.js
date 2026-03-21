import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    events: [],
    modalState: false,
    loading: false,
	error: null
}

const CalendarReducer = createSlice({
    name: "Calendars",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload]
        },
        openModal: (state) => {
            state.modalState = true
        },
        closeModal: () => {
            state.modalState = false
        },
        clearError: (state) => {
			state.error = null
		}
    },
    extraReducers: (builder) => {
        builder.addCase(addNewEvent.pending, (state) => {
            state.loading = true
            state.error = null
        }),
        builder.addCase(addNewEvent.fulfilled, (state, action) => {
            state.loading = false
            state.events = action.payload
        }),
        builder.addCase(addNewEvent.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.error || action.error.message
        }),
        builder.addCase(getEvents.pending, (state) => {
            state.loading = true
            state.error = null
        }),
        builder.addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false
            state.events = action.payload
        }),
        builder.addCase(getEvents.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.error || action.error.message
        })
    }
});

export const addNewEvent = createAsyncThunk(
	"auth/addNewEvent",
	async (data, { rejectWithValue, getState }) => {
		try {
			const response = await fetch("http://localhost:3000/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
                    Autorization: `Bearer ${getState().auth.token}`
				},
				body: JSON.stringify(data)
			})

			let result = await response.json()
			if (!response.ok) {
				return rejectWithValue({ error: result.error})
			}
			return result
		} catch (error) {
			throw error;
		}
	}
)

export const getEvents = createAsyncThunk(
	"auth/getEvents",
	async (data, { rejectWithValue, getState }) => {
		try {
			const response = await fetch("http://localhost:3000/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
                    Autorization: `Bearer ${getState().auth.token}`
				}
			})

			let result = await response.json()
			if (!response.ok) {
				return rejectWithValue({ error: result.error})
			}
			return result
		} catch (error) {
			throw error;
		}
	}
)

export const { addEvent, openModal, closeModal, clearError } = CalendarReducer.actions

export default CalendarReducer.reducer