import { createEvent, findAllEvents, countNews, latestEvent, findById, findByTitle, findEventsByUser } from './event.service.js'

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
    let { limit, offset } = req.query

    limit = Number(limit)
    offset = Number(offset)

    if (!limit) {
      limit = 10
    }

    if (!offset) {
      offset = 0
    }

    const events = await findAllEvents(limit, offset)
    if (events.length === 0) return res.status(404).send({ message: 'There are no registered events' })

    const total = await countNews()
    const currentUrl = req.baseUrl

    const next = offset + limit
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit
    const previusUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    res.status(200).send({
      nextUrl,
      previusUrl,
      limit,
      offset,
      total,

      results: events.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        address: item.address,
        maxPeople: item.maxPeople,
        spaceImage: item.spaceImage,
        owner: item.owner.fullName
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function lastestEventController (req, res) {
  try {
    const event = await latestEvent()
    if (!event) return res.status(400).send({ message: 'There is no registered events' })

    res.send({
      event: {
        id: event._id,
        title: event.title,
        description: event.description,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        address: event.address,
        maxPeople: event.maxPeople,
        spaceImage: event.spaceImage,
        owner: event.owner.fullName
      }
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function findByIdController (req, res) {
  try {
    const { id } = req.params

    const event = await findById(id)
    if (!event) return res.status(404).send({ message: 'Event not found!' })

    res.send({
      event: {
        id: event._id,
        title: event.title,
        description: event.description,
        startsAt: event.startsAt,
        endsAt: event.endsAt,
        address: event.address,
        maxPeople: event.maxPeople,
        spaceImage: event.spaceImage,
        owner: event.owner.fullName
      }
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function searchByTitleController (req, res) {
  try {
    const { title } = req.query

    const event = await findByTitle(title)
    if (!event.length === 0) return res.status(400).send({ message: 'There are no events with this title' })

    res.send({
      results: event.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        address: item.address,
        maxPeople: item.maxPeople,
        spaceImage: item.spaceImage,
        owner: item.owner.fullName
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export async function byUserController (req, res) {
  try {
    const id = req.userId

    const events = await findEventsByUser(id)

    res.send({
      results: events.map(item => ({
        id: item._id,
        title: item.title,
        description: item.description,
        startsAt: item.startsAt,
        endsAt: item.endsAt,
        address: item.address,
        maxPeople: item.maxPeople,
        spaceImage: item.spaceImage,
        owner: item.owner.fullName
      }))
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
