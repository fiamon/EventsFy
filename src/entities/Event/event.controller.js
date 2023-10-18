import { createEvent, findAllEvents } from './event.service.js'

export async function createEventController (req, res) {
  try {
    const { title, description, startsAt, endsAt, address, maxPeople, spaceImage } = req.body
    if (!title || !description || !startsAt || !endsAt || !address || !maxPeople || !spaceImage) return res.status(400).send({ message: 'Please fill in all fields to create an event' })

    const event = await createEvent({
      owner: req.userId,
      title,
      description,
      startsAt,
      endsAt,
      address,
      maxPeople,
      spaceImage
    })

    if (!event) return res.status(400).send({ message: 'An error occurred while creating the event. Try again later' })

    res.status(201).send({
      message: 'Event successfully created',
      createdEvent: { event }
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function findAllEventsController (req, res) {
  try {
    const events = await findAllEvents()
    if (events.length === 0) return res.status(404).send({ message: 'There are no registered events' })

    res.status(200).send(events)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
